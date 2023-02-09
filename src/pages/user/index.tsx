import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import withAuth from "components/HOCs/withAuth";
import HomeLayout from "layouts/HomeLayout";
import DeleteIcon from "components/common/Icons/DeleteIcon";
import companies from "api/companies";
import useStore from "hooks/useStore";
import StaffMembersPopUp from "components/PopUp/StaffMemberPopup";
import EditIcon from "components/common/Icons/EditIcon";
import api from "api";
import StatApi from "api/stat";
import ConfirmPopUp from "components/common/ConfirmPopUp";
import Loading from "components/common/Loading";
import useToast from "hooks/useToast";
import { validateEmail } from "utils/format";
import ROUTES from "constants/routes";
import PopUp from "components/PopUp";
import TextInput from "components/common/TextInput";
import ACTIONS from "constants/actions";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import ImageUpload from "components/common/ImageUpload";

function SettingsPage(): JSX.Element {
  const { store, dispatch } = useStore();
  const { toast } = useToast();
  const router = useRouter();
  const [staff, setStaff] = useState<StaffType[]>([]);
  const [editCompanyPopupActive, setEditCompanyPopupActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [targetUser, setTargetUser] = useState<StaffType | undefined>();
  const [renderTrigger, setRenderTrigger] = useState(0);
  const [confirmPopupActive, setConfirmPopupActive] = useState(false);
  const [popupActive, setPopupActive] = useState(false);
  const [popupAction, setPopupAction] = useState<"add" | "edit">("add");

  const validateFields = (name: string, email: string) => {
    const errors = [];
    if (name.length === 0) {
      toast.error("Name is required", "Error");
      errors.push("name");
    }
    if (email.length === 0) {
      toast.error("Email is required", "Error");
      errors.push("email");
    } else if (!validateEmail(email)) {
      toast.error("Email is invalid", "Error");
      errors.push("email");
    }

    return errors.length === 0;
  };

  /**
   * Handle get list of staff
   */
  const handleGetStaff = () => {
    if (store.company?._id && store.accessToken) {
      api.companies.users
        .get(store.accessToken, store.company._id)
        .then((res) => {
          setStaff(res.data.items);
          setIsLoading(false);
        })
        .catch(console.log);
    }
  };

  useEffect(() => {
    handleGetStaff();
  }, [renderTrigger]);

  useEffect(() => {
    void (async () => {
      if (store.company?.logoUrl) {
        const response = await fetch(store.company.logoUrl);
        const blob = await response.blob();
        const file = new File([blob], "image.jpg", { type: blob.type });
        setInitialCompanyImage(file);
      } else setInitialCompanyImage(undefined);
    })();
  }, [store.company]);

  /**
   * Initial load
   */
  useEffect(() => {
    void handleGetStaff();
  }, [store.company]);

  return (
    <>
      <PopUp
        buttonLabel="Update"
        onSubmit={() => {
          if (companyName.length > 0) {
            if (store.company?._id && store.accessToken)
              api.companies
                .update(store.accessToken, store.company._id, {
                  name: companyName,
                })
                .then((res) => {
                  dispatch({
                    type: ACTIONS.COMPANY.SET,
                    payload: { company: res.data },
                  });
                  toast.success("Company name updated", "Success");
                  setEditCompanyPopupActive(false);
                })
                .catch(console.log);
          } else {
            toast.error("Company name is required", "Error");
          }
        }}
        active={editCompanyPopupActive}
        onClose={() => setEditCompanyPopupActive(false)}
      >
        <h2 className="flex-1  pt-serif text-3xl font-bold mb-2">
          Edit company name
        </h2>
        <TextInput
          label=""
          value={companyName}
          onChange={(e) => setCompanyName(e.currentTarget.value)}
        />
      </PopUp>
      <ConfirmPopUp
        buttonDisabled={isSaving}
        target={targetUser?.name}
        type="delete"
        active={confirmPopupActive}
        onClose={() => setConfirmPopupActive(false)}
        onConfirm={() => {
          if (store.company?._id && targetUser?._id && store.accessToken) {
            setIsSaving(true);
            api.companies.users
              .delete(store.accessToken, store.company._id, targetUser._id)
              .then(() => {
                setRenderTrigger(renderTrigger + 1);
                toast.success("Staff member deleted", "Success");
              })
              .catch(console.log)
              .finally(() => {
                setConfirmPopupActive(false);
                setIsSaving(false);
              });
          }
        }}
      />
      <StaffMembersPopUp
        onDelete={() => setConfirmPopupActive(true)}
        buttonDisabled={isSaving}
        initialValue={targetUser}
        onSubmit={(staffData) => {
          setIsSaving(true);
          if (
            store.company?._id &&
            validateFields(staffData.name!, staffData.email!)
          ) {
            if (popupAction === "add") {
              if (store.accessToken)
                api.companies.users
                  .add(store.accessToken, store.company._id, staffData)
                  .then((res) => {
                    if (res.status === 200) {
                      setRenderTrigger(renderTrigger + 1);
                      toast.success("Staff member added", "Success");
                    } else {
                      toast.error(
                        // eslint-disable-next-line
                        // @ts-ignore
                        res.response.data,
                        "Staff member already exists"
                      );
                    }
                  })
                  .catch((e) => {
                    console.log(e);
                  })
                  .finally(() => {
                    setPopupActive(false);
                    setIsSaving(false);
                  });
            } else if (
              popupAction === "edit" &&
              targetUser?._id &&
              store.accessToken
            ) {
              api.companies.users
                .update(
                  store.accessToken,
                  store.company._id,
                  targetUser._id,
                  staffData
                )
                .then(() => {
                  setRenderTrigger(renderTrigger + 1);
                  toast.success("Staff member updated", "Success");
                })
                .catch(console.log)
                .finally(() => {
                  setPopupActive(false);
                  setIsSaving(false);
                });
            }
          }
        }}
        popupAction={popupAction}
        active={popupActive}
        onClose={() => setPopupActive(false)}
      />
      <HomeLayout id="settings" className="">
        <div className="p-12 min-h-screen">
          <h1 className="mt-4 text-slate-800 text-5xl font-bold pt-serif">
            Settings
          </h1>
          <div>
            <div className="w-full flex items-center">
              <h2 className="flex-1 pt-serif text-3xl font-bold mt-10 mb-2">
                Company details
              </h2>
              <button
                id="settings-add-account"
                type="button"
                onClick={() => {
                  if (store.accessToken)
                    api.auth
                      .logout(store.accessToken)
                      .then(() => {
                        removeCookies("accessToken", { path: "/" });
                        void router.push(ROUTES.SIGNUP_ROUTE);
                      })
                      .catch((e: AxiosError) => alert(e.response));
                }}
                className="border border-teal-500 py-2 px-4 font-medium text-teal-500"
              >
                Add new account
              </button>
            </div>
            <p className="mt-4">Company logo</p>
            <div className="flex items-center">
              <ImageUpload
                image={companyImage || initialCompanyImage}
                onChange={(e) => {
                  // if image exists, set image to companyImage state
                  if (e.target.files && e.target.files[0]) {
                    setCompanyImage(e.target.files[0]);
                    setImageSaved(false);
                  }
                }}
              />

              {Boolean(companyImage) && !imageSaved && (
                <button
                  type="button"
                  className="py-2 px-4 font-medium bg-teal-500 text-white ml-4 rounded"
                  onClick={() => {
                    if (
                      store.company?._id &&
                      store.accessToken &&
                      companyImage
                    ) {
                      api.companies
                        .setLogo(
                          store.accessToken,
                          store.company._id,
                          companyImage
                        )
                        .then((res) => {
                          dispatch({
                            type: ACTIONS.COMPANY.SET,
                            payload: { company: res.data },
                          });
                          setImageSaved(true);
                          setCompanyImage(undefined);
                          toast.success("Company logo updated", "Success");
                        })
                        .catch(console.log);
                    }
                  }}
                >
                  Save
                </button>
              )}

              {(Boolean(companyImage) || Boolean(!initialCompanyImage)) && (
                <button
                  className="ml-4"
                  type="button"
                  onClick={() => {
                    setCompanyImage(undefined);
                    setInitialCompanyImage(undefined);
                  }}
                >
                  <DeleteIcon size={24} />
                </button>
              )}
            </div>

            <p className="mt-4">Company name</p>
            <div className="mt-1 flex items-center text-sm bg-slate-50 font-semibold font-sans text-slate-800 pl-[38px]  py-[19px]">
              <p className="flex-1">{store.company?.name}</p>
              <div className={`flex items-center mr-6 `}>
                <button
                  onClick={() => {
                    setCompanyName(store.company?.name || "");
                    setEditCompanyPopupActive(true);
                  }}
                  type="button"
                  className="mr-2"
                >
                  <EditIcon size={16} color="#14B8A6" />
                </button>
              </div>
            </div>
          </div>
          <div>
            <h2 className="pt-serif text-3xl font-bold  mt-10 mb-2">
              Plan and payment details
            </h2>
            <p className="mb-[5px] mt-[16px]">Current plan</p>
            <div className="bg-slate-100 w-80 py-[9px] px-3 rounded">
              <span className="text-gray-700 text-base">
                {store.company?.stripePricingName}
              </span>{" "}
              <button
                id="settings-plan-change"
                type="button"
                onClick={handleStipePortalUrl}
                className="text-teal-500 text-base float-right"
              >
                Change
              </button>
              <div className="clear-both" />
            </div>
            <p className="mb-[5px] mt-[16px]">Payment details</p>
            <div className="bg-slate-100 w-80 py-[9px] px-3 rounded">
              <span className="text-gray-700 text-base">Handled by stripe</span>{" "}
              <button
                id="settings-payment-change"
                type="button"
                className="text-teal-500 text-base float-right"
              >
                Change
              </button>
              <div className="clear-both" />
            </div>
          </div>
          <div>
            <div className="w-full flex items-center">
              <h2 className="flex-1 pt-serif text-3xl font-bold mt-10 mb-2">
                Staff members
              </h2>
              <button
                id="settings-staff-add"
                type="button"
                onClick={() => {
                  setTargetUser({ name: "", email: "", _id: "" });
                  setPopupActive(true);
                  setPopupAction("add");
                }}
                className="border border-teal-500 py-2 px-4 font-medium text-teal-500"
              >
                Add new staff member
              </button>
            </div>

            <table className="table-auto w-full my-2">
              <tbody>
                {isLoading ? (
                  <tr>
                    <Loading width="100%" className="mb-1" height={54} />
                    <Loading width="100%" className="mb-1" height={54} />
                    <Loading width="100%" className="mb-1" height={54} />
                  </tr>
                ) : (
                  staff.map((u, index) => {
                    return (
                      <tr className={index % 2 === 0 ? "bg-slate-50" : ""}>
                        <td className="text-sm font-semibold font-sans text-slate-800 pl-[38px]  py-[19px]">
                          {u.name}
                        </td>
                        <td className="text-sm font-normal font-sans text-slate-800 py-[19px]">
                          {u.email}
                        </td>
                        <td>
                          <span className="text-sm font-normal text-slate-800 font-sans rounded-full py-1 px-3 bg-slate-200">
                            Manager
                          </span>
                        </td>
                        <td className="text-sm font-normal font-sans py-[19px] pr-[38px]">
                          <button
                            id={`settings-staff-edit-${u._id}`}
                            type="button"
                            className="mr-2"
                            onClick={() => {
                              setPopupActive(true);
                              setPopupAction("edit");
                              setTargetUser(u);
                            }}
                          >
                            <EditIcon size={16} color="#14B8A6" />
                          </button>
                          {u._id !== store.user?._id && (
                            <button
                              id={`settings-staff-delete-${u._id}`}
                              type="button"
                              onClick={() => {
                                setTargetUser(u);
                                setConfirmPopupActive(true);
                              }}
                            >
                              <DeleteIcon size={20} />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </HomeLayout>
    </>
  );
}
//

export default withAuth(SettingsPage);
