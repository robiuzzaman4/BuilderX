const Footer1 = () => {
  return (
    <header className="h-16 bg-white">
      <div className="h-full w-full max-w-7xl mx-auto flex items-center justify-between gap-6 px-4">
        <span className="font-bold hover:cursor-pointer text-orange-500">
          LOGO
        </span>
        <div className="flex items-center gap-2 lg:gap-6 text-sm font-medium">
          <p className="hover:cursor-pointer hover:text-orange-500">About</p>
          <p className="hover:cursor-pointer hover:text-orange-500">Contact</p>
        </div>
      </div>
    </header>
  );
};

export default Footer1;
