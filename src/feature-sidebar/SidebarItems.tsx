import type { ISidebarItemsProps, ISidebarItems } from "./ISidebar";

/**
 * Sidebar list items
 * @param items: elements that can be represented by a list 
 * @returns 
 */
const SidebarItems = ({items}:ISidebarItemsProps)=>{
    return(
        <ul className="menu h-full bg-base-200 text-base-content content-stretch justify-evenly">
            {items.map((item:ISidebarItems)=><li key={item.item || item.icon}><div className="flex flex-row gap-5"><p onClick={()=>console.log('ciao')}>{item.icon}</p><a href={item.url}>{item.item}</a></div></li>)}
        </ul>
    ) 
}

export default SidebarItems;