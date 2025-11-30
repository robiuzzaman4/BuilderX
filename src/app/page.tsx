import Navbar4 from "@/components/navbars/navbar4";
import Navbar6 from "@/components/navbars/navbar6";
import Navbar5 from "@/components/navbars/navbar5";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/sheet/sheet";

const HomePage = () => {
  return (
    <main className="min-h-screen w-full bg-zinc-50">
      <Navbar4 />
      {/* <Navbar5 /> */}
      {/* <Navbar6 /> */}

      <Sheet >
        <SheetTrigger className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
          Open Controlled Sheet
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader className="mt-6">
            <SheetTitle>Controlled Sheet</SheetTitle>
            <SheetDescription>
              This sheet is controlled via state. Open state:{" "}
 
            </SheetDescription>
          </SheetHeader>
          <div className="py-6">
            <p>You can control this sheet from outside using state.</p>
          </div>
          <SheetFooter>
            <SheetClose>
              Close
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </main>
  );
};

export default HomePage;
