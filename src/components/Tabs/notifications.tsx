import HeaderTab from "../HeaderTab";
import ContainerTab from "../../layout/ContainerTab";
import NotifyList from "../NotifyList";

export default function Notifications(){
    return(
        <ContainerTab showSearchBar={false} >
            <HeaderTab label="Notificações" />
            <NotifyList />
        </ContainerTab>
    )
}