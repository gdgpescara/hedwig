import { useState } from "react";
import type { ISidebar, ISidebarItems } from "./ISidebar";
import SidebarItems from "./SidebarItems";
import Header from "~/feature-header/Header";

/**
 * Sidebar component
 * @param children: is the page content
 * @returns 
 */
const Sidebar = ({ children }:ISidebar)=>{
    const [toggleDrawer, setToggleDrawer] = useState<boolean>(false);
    //TODO: sarà da togliere!!
    const items:ISidebarItems[] = [{icon:"A"}, {icon:"B"}, {icon:"C"}, {icon:"D"}, {icon:"E"}, {icon:"F"}];
    const menuItems:ISidebarItems[] = [{icon:"A", item:"Sidebar Item A", url:"#"}, {icon:"B", item:"Sidebar Item B", url:"#"}, {icon:"C", item:"Sidebar Item C", url:"#"}, {icon:"D", item:"Sidebar Item D", url:"#"}, {icon:"E", item:"Sidebar Item E", url:"#"}, {icon:"F", item:"Sidebar Item F", url:"#"}]
    return(
        <> 
          <div className={`drawer lg:drawer-${toggleDrawer ? 'open' : 'close'}`}>
              <button className="opacity-100 bg-base-200 drawer-toggle h-lvh w-16 hidden lg:block" onMouseOver={()=>setToggleDrawer(true)} onFocus={()=>setToggleDrawer(true)}>
                <div className="h-full w-12">
                  <SidebarItems items={items} />
                </div>
              </button>
              <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            
              <div className="drawer-content flex flex-col items-center">
                <label htmlFor="my-drawer-2" className="btn btn-primary self-start drawer-button lg:hidden">Open</label>
                <div className="m-0 lg:w-5/6 w-full">
                    <Header/>
                    {children}
                </div>
              </div> 

              <div className="drawer-side" onMouseLeave={()=>setToggleDrawer(false)}>
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
                <SidebarItems items={menuItems} />
              </div>
          </div>
        </>
    )
}


export default Sidebar;
