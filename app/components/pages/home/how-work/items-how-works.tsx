import { ReactNode } from "react";

type HowWorkProps = {
  items: {
    icon: ReactNode;
    title: string;
    desc: string;
  };
};

export const ItemsHow = ({ items }: HowWorkProps) => {
  return (
    <div className="p-6 m-3 lg:h-[350px] md:h-[500px] lg:w-[360px] md:max-w-2xl rounded-lg bg-gray-600/20 text-gray-500 flex flex-col items-center hover:text-red-500 hover:bg-gray-600/30 transition-all">
      <span className="mb-2">{items.icon}</span>
      <div className="flex flex-col items-center">
        <p className="font-medium mr-1 text-[23px]">{items.title}</p>
        <p className="font-medium mr-1 flex content-center my-5">
          {items.desc}
        </p>
      </div>
    </div>
  );
};
