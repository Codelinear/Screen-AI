const TestLoading = ({ progress }: { progress: number }) => {
  return (
    <div className="w-full bg-whitesmoke overflow-hidden flex flex-col items-start justify-start pt-32 pl-6 md:pb-0 pb-10 sm:pl-14 xl:pl-28 box-border gap-[3.2rem] h-lg:gap-[7.125rem] text-left text-[2.294rem]">
      <div className="w-[63.638rem] flex flex-col items-start justify-start mb-10 max-w-full text-darkslategray">
        <h1 className="w-3/4 self-stretch  text-[2rem] md:text-[3.125rem] mb-20">
          Give us a moment while we check if you are the right fit.
        </h1>
        <div className="w-[90vw] bg-white md:w-[48rem] h-[1.8rem] md:h-[2.438rem] rounded-full overflow-hidden">
          <div
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #EBDFFF 0%, #F5AFEA 100%)",
            }}
            className="transition-all duration-100 rounded-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TestLoading;
