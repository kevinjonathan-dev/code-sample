import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import css from './styles.module.scss';

export default function Toast() {
  return <ToastContainer className={css.toast} />;
}
