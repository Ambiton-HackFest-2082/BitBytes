const CustomButton = ({ text, disabled, onclick, customwidth }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={onclick}
      style={{width:customwidth}}
      className={`flex ${
        disabled ? "cursor-not-allowed bg-primary-200 text-secondary-300" : "bg-primary-100 text-white"
      } md:scale-100 justify-center rounded-md  px-3 py-2 text-sm/6  font-semibold shadow-sm hover:bg-primary-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-200`}
    >
      {text}
    </button>
  );
};

export default CustomButton;
