import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import Content from "../component/Content";

export default function Layout({children}){
    return(
        <div>
            <Header />
            <div style={{display:'grid', gridTemplateColumns:'20em  2fr'}}>
                <Sidebar />
                <Content>
                    {children}
                </Content>
            </div>
           
            
        </div>
    )
}