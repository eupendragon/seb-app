import ContainerTab from "../../layout/ContainerTab";
import HeaderTab from "../HeaderTab";
import FavoriteList from "../FavoriteList";

export default function Favorites(){
    return(
        <ContainerTab>
            <HeaderTab label="Favoritados"/>
            <FavoriteList />
        </ContainerTab>
    )
}