import React, { Fragment, useEffect, useState } from 'react';
import useStore from 'hooks/useStore';
import api from 'api';
import HomeLayout from 'layouts/HomeLayout';
import Table from 'components/Table';
import withAuth from 'components/HOCs/withAuth';
import LoadingPage from 'components/common/LoadingPage';
import { formatDate } from 'utils/format';
import ACTIONS from 'constants/actions';
import { useRouter } from 'next/router';
import useToast from 'hooks/useToast';
import { DEFAULT_LIMIT } from 'constants/api';

function MembersPage(): JSX.Element {
  const router = useRouter();
  const [members, setMembers] = useState<UserType[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [count, setCount] = useState(0);
  const { store, dispatch } = useStore();
  const { toast } = useToast();
  const [selectedRows, setSelectedRows] = useState<boolean[]>([false]);

  const fetchData = () => {
    if (store.accessToken) {
      api.members
        .getAll(store.accessToken, query, limit)
        .then((res) => {
          setCount(res.data.count);
          setMembers(res.data.items);
          setIsLoading(false);
        })
        .catch(console.log);
    }
  };

  useEffect(() => {
    fetchData();
  }, [limit]);

  // useEffect(() => {
  //   fetchData();
  // }, [filter]);

  // useEffect(() => {
  //   fetchData();
  // }, [renderTrigger]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <>
      <HomeLayout id="employees" className="relative">
        {isLoading ? (
          <LoadingPage />
        ) : (
          <div className="p-12 min-h-screen relative">
            <>
              <div className="flex w-full">
                <h1 className={` text-slate-800 text-5xl font-bold pt-serif`}>
                  Members
                </h1>
              </div>
              <>
                <Table
                  searchPlaceholder="Search by name"
                  selected={selectedRows}
                  onSelectAll={(selected) => {
                    setSelectedRows(selected);
                  }}
                  onRowClick={async (index) => {
                    if (store.accessToken && members[index]._id) {
                      try {
                        const res = await api.members.get(
                          store.accessToken,
                          members[index]._id!,
                        );
                        dispatch({
                          type: ACTIONS.USER.SET_ADMIN_ACCESS,
                          payload: {
                            adminAccess: true,
                          },
                        });
                        dispatch({
                          type: ACTIONS.COMPANY.SET,
                          payload: {
                            company: res.data,
                          },
                        });
                        void router.push('/dashboard');
                      } catch {
                        toast.error();
                      }
                    }
                  }}
                  onQueryChange={(query) => setQuery(query)}
                  onSelect={(selectedRows) => setSelectedRows(selectedRows)}
                  columns={[
                    {
                      header: `Name`,
                      rows: members.map((company) => company.name),
                      className: 'min-w-[200px] min-w-fit flex-1',
                    },
                    {
                      header: 'Employees',
                      rows: members.map(
                        (company) => `${company.employeesCount}`,
                      ),
                      className: 'flex-1',
                    },
                    {
                      header: 'Date Registered',
                      rows: members.map((company) =>
                        formatDate(company.dateCreated!),
                      ),
                      width: 100,
                      className: 'flex-1',
                    },
                  ]}
                />
                <div className="flex w-full flex-col items-center">
                  <p className="text-sm text-slate-400 italic mt-6 mb-8">
                    viewing {members.length} out of {count} members
                  </p>
                  {members.length < count && (
                    <button
                      type="button"
                      onClick={() => setLimit(limit + DEFAULT_LIMIT)}
                      className="py-2 px-4 border border-teal-500 text-teal-500 font-medium"
                    >
                      Load More
                    </button>
                  )}
                </div>
              </>
            </>
          </div>
        )}
      </HomeLayout>
    </>
  );
}

export default withAuth(MembersPage);
