import Image from "next/image";
import Link from "next/link";

const RightSidebar = async () => {
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[300px] flex-col  overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>Right Sidebar</div>
    </section>
  );
};

export default RightSidebar;
