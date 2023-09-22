"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./sideBar";
import { User } from "@prisma/client";
// import { Sidebar } from "@/components/sidebar";

 const MobileSidebar = ({curUser
}:{curUser:User | null | undefined}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
console.log(curUser)
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar curUser={curUser}/>
      </SheetContent>
    </Sheet>
  );
};
export default MobileSidebar