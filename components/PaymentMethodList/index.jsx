import React from "react";
import { useState } from "react";
import { formatCurrency } from "../../helpers/common";
import { Button, ButtonWithIcon } from "../Button";

export default function PaymentMethodList({
  paymentMethodData,
  valueStorageSetState,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(
    paymentMethodData?.bank_transfers[0]
  );

  const handleChangePaymentMethod = (paymentType) => {
    valueStorageSetState(paymentType);

    const filteredBankTransfersMethod =
      paymentMethodData?.bank_transfers.filter(
        (method) => method.payment_type === paymentType
      );
    const filteredEWalletMethod = paymentMethodData?.ewallets.filter(
      (method) => method.payment_type === paymentType
    );

    if (filteredBankTransfersMethod.length > 0) {
      setSelectedPayment(filteredBankTransfersMethod[0]);
    } else if (filteredEWalletMethod.length > 0) {
      setSelectedPayment(filteredEWalletMethod[0]);
    }
  };

  return (
    <div className="payment-method-list w-full relative z-10">
      <div className="payment-method-list__wrapper w-full flex flex-col">
        <label
          className="payment-method-list__options__item flex w-full items-center justify-between border-l-4  border-opacity-50 shadow-md border-danger p-[15px] rounded-lg bg-[#f8f8f8]"
          htmlFor={selectedPayment?.payment_type}
          onClick={() => {
            setShowOptions(!showOptions);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <div className="flex items-center gap-[15px]">
            <div className="payment-method-list__options__item__thumbnail">
              <picture>
                <img
                  src={`/images/payment/${selectedPayment?.payment_type}.png`}
                  alt="payment method"
                  className="w-[40px] rounded-md"
                />
              </picture>
            </div>
            <div className="flex flex-col justify-center">
              <div className="payment-method-list__options__item__title text-[24px] leading-[24px] p-0 ">
                <span>{selectedPayment?.display_name}</span>
              </div>
              <div className="payment-method-list__options__item__desc text-[18px] leading-[18px] text-gray-500">
                <p>
                  Biaya Transaksi Rp.{" "}
                  {formatCurrency(selectedPayment?.admin_fee?.IDR.currency_val)}
                </p>
              </div>
            </div>
          </div>
        </label>

        <div className="payment-method-list__change w-full py-[5px]">
          <div className="payment-method-list__change__button w-full flex justify-center">
            <button
              className="py-[5px]  w-full rounded-lg"
              onClick={() => {
                setShowOptions(!showOptions);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              <span className="text-[22px] text-secondary">
                Klik untuk merubah metode pembayaran &raquo;
              </span>
            </button>
          </div>
        </div>
      </div>
      {showOptions ? (
        <div
          className={` animation-popup fixed  top-0 w-full left-0 h-full overflow-y-scroll bg-white`}
        >
          <div className="payment-method-list__options__wrapper px-[20px] py-[40px]">
            <div className="payment-method-list__options__title  text-2xl text-secondary mb-[10px]">
              <h3>Bank Transfer</h3>
            </div>
            <div className="payment-method-list__options__item__wrapper flex flex-col gap-[10px] mb-[10px]">
              {paymentMethodData.bank_transfers.map((item, index) => (
                <label
                  key={index}
                  className="payment-method-list__options__item flex w-full items-center justify-between border-l-4  border-opacity-50 shadow-md border-danger p-[15px] rounded-lg bg-[#f8f8f8] cursor-pointer"
                  htmlFor={item.payment_type}
                  onClick={() => {
                    handleChangePaymentMethod(item.payment_type);
                    setShowOptions(!showOptions);
                  }}
                >
                  <div className="flex items-center gap-[15px]">
                    <div className="payment-method-list__options__item__thumbnail">
                      <picture>
                        <img
                          src={`/images/payment/${item.payment_type}.png`}
                          alt="payment method"
                          className="w-[40px] rounded-md"
                        />
                      </picture>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="payment-method-list__options__item__title text-[24px] leading-[24px] p-0 ">
                        <span>{item.display_name}</span>
                      </div>
                      <div className="payment-method-list__options__item__desc text-[18px] leading-[18px] text-gray-500">
                        <p>
                          Biaya Transaksi{" "}
                          {formatCurrency(item.admin_fee.IDR.currency_val)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* <input
                    className="justify-self-end shadow-none"
                    type="radio"
                    name="payment-method"
                    id={item.payment_type}
                  /> */}
                </label>
              ))}
            </div>
            <div className="payment-method-list__options__title  text-2xl text-secondary mb-[10px]">
              <h3>E-Wallets</h3>
            </div>
            <div className="payment-method-list__options__item__wrapper flex flex-col gap-[10px] mb-[10px]">
              {paymentMethodData.ewallets.map((item, index) => (
                <label
                  key={index}
                  className="payment-method-list__options__item flex w-full items-center justify-between border-l-4  border-opacity-50 shadow-md border-danger p-[15px] rounded-lg bg-[#f8f8f8] cursor-pointer"
                  htmlFor={item.payment_type}
                  onClick={() => {
                    handleChangePaymentMethod(item.payment_type);
                    setShowOptions(!showOptions);
                  }}
                >
                  <div className="flex items-center gap-[15px]">
                    <div className="payment-method-list__options__item__thumbnail">
                      <picture>
                        <img
                          src={`/images/payment/${item.payment_type}.png`}
                          alt="payment method"
                          className="w-[40px] rounded-md"
                        />
                      </picture>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="payment-method-list__options__item__title text-[24px] leading-[24px] p-0 ">
                        <span>{item.display_name}</span>
                      </div>
                      <div className="payment-method-list__options__item__desc text-[18px] leading-[18px] text-gray-500">
                        <p>
                          Biaya Transaksi{" "}
                          {formatCurrency(item.admin_fee.IDR.currency_val)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* <input
                    className="justify-self-end shadow-none"
                    type="radio"
                    name="payment-method"
                    id={item.payment_type}
                  /> */}
                </label>
              ))}
            </div>
            <div className="payment-method-list__options__button w-full flex justify-center mt-[20px]">
              <div className="w-1/2">
                {/* <ButtonWithIcon
                  classNameInject="w-1/2 bg-slate-200 text-[22px] "
                  icon="/images/logo.png"
                  text="Tutup"
                  click={() => setShowOptions(!showOptions)}
                /> */}
                <Button
                  classNameInject=" bg-danger border-2 border-danger rounded-md text-[22px] text-white"
                  icon="/images/logo.png"
                  text="&laquo; Kembali"
                  click={() => setShowOptions(!showOptions)}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
