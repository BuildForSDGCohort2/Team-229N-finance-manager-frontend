import React, { FC, useRef } from 'react';
import { DataArray } from '../../../redux/interface';
import { useTypedSelector } from '../../../redux/stateTypes';
import AccoutTop from '../AccoutTop';
import { CompanyProps } from '../interface';
import dayjs from 'dayjs';
import { numberWithCommas } from '../../utils/helpers';
import PrintButton from '../Print';
const Debit: FC<DataArray> = ({ amount, details, code, pd }) => {
  return (
    <tr>
      <td>{dayjs(pd).format('DD/MM/YYYY')}</td>
      <td>{details}</td>
      <td>{code}</td>
      <td className="center">{numberWithCommas(amount)}</td>
      <td className="center"></td>
    </tr>
  );
};
const Credit: FC<DataArray> = ({ amount, details, pd, code }) => {
  return (
    <tr>
      <td>{dayjs(pd).format('DD/MM/YYYY')}</td>
      <td>{details}</td>
      <td>{code}</td>
      <td className="center"></td>
      <td className="center">{numberWithCommas(amount)}</td>
    </tr>
  );
};
const Journal: FC<{ props: CompanyProps }> = ({ props }) => {
  const { email, location, name } = props;
  const { transactions } = useTypedSelector((state) => state.journal);
  let totalCredit = 0;
  let totalDebit = 0;
  const componentRef = useRef(null);
  return (
    <>
      {/* <Ovary showOvary={showOvary} /> */}
      <div className="card-panel" ref={componentRef}>
        <AccoutTop
          account="General Journal"
          name={name}
          email={email}
          location={location}
        />
        <table className="black-text striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Details</th>
              <th>Ref</th>
              <th className="center">Debit (USD)</th>
              <th className="center">Credit (USD)</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => {
              t.type === 'dr'
                ? (totalDebit += t.amount)
                : (totalCredit += t.amount);
              return t.type === 'dr' ? (
                <Debit
                  key={t._id}
                  amount={t.amount}
                  details={t.details}
                  pd={t.pd}
                  code={t.code}
                />
              ) : (
                <Credit
                  key={t._id}
                  amount={t.amount}
                  details={t.details}
                  pd={t.pd}
                  code={t.code}
                />
              );
            })}

            {/* <tr>
              <td>
                <b>TOTAL</b>
              </td>
              <td></td>
              <td></td>
              <td className="center underline">
                <b>{numberWithCommas(totalDebit)}</b>
              </td>
              <td className="center underline">
                <b>{numberWithCommas(totalCredit)}</b>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
      <PrintButton componentRef={componentRef} />
    </>
  );
};

export default Journal;
