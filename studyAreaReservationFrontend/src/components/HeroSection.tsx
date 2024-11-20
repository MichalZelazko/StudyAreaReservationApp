import { ReactTyped } from "react-typed";

const HeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center w-full md:gap-12">
      <div className="w-full md:w-2/3 flex flex-col gap-7 p-6">
        <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold">
          Let's make studying on campus<br></br>{" "}
          <ReactTyped
            strings={["accessible", "comfortable", "pleasant"]}
            typeSpeed={100}
            loop
            backSpeed={100}
            backDelay={1000}
          />
          .
        </h2>
        <p className="text-lg md:text-xl xl:text-3xl">
          This app allows you to reserve a studying area to ensure you don't
          have to sit on the floor against the wall once again.
        </p>
        <a
          href="/buildings"
          className="bg-blue-700 text-white px-6 py-3 rounded-xl font-medium text-xl hover:bg-white hover:text-blue-700 hover:border-2 hover:border-blue-700 transition-colors duration-300 w-fit"
        >
          Look for a spot in your building now!
        </a>
      </div>
      <div className="w-full md:w-1/3">
        <img src="/student.png" alt="Hero" className="w-full" />
      </div>
    </div>
  );
};

export default HeroSection;
