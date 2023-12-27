import React from "react";

export function FacilityListWithQuota({
  data = [
    {
      name: "gamma1",
      quota: 1,
    },
    {
      name: "gamma1",
      quota: 1,
    },
    {
      name: "gamma1",
      quota: 1,
    },
  ],
}) {
  return (
    <div className="facilityListWithQuota">
      <div className="facilityListWithQuota__wrapper flex flex-wrap justify-center   mb-[10px]">
        {data.map((item, index) => (
          <div
            key={index}
            className="facilityListWithQuota__item rounded-md p-[10px] bg-white shadow-md m-[3px]"
          >
            <div className="facilityListWithQuota__item__wrapper flex divide-x-[2px] gap-[5px] items-center justify-center">
              <div className="facilityListWithQuota__item__title text-sm text-center text-get_desc ">
                <h3>{item.name} </h3>
              </div>
              <div className="facilityListWithQuota__item__quota text-center font-bold text-get_blue text-lg pl-1">
                <span> {item.quota}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
