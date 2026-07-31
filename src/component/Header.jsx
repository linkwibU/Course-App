import logo from "../assets/logo.jpg";
import user from "../assets/user.jpg";

export default function Header() {

    return (
        <section style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'baseline' }}>
            <div style={{ display: 'flex', flexDirection: 'row', fontSize: '10px' }}>
                <h1>Course365</h1>

                <img style={{ width: '5em', height: '5em', borderRadius: '3em' }} src={logo} alt="Course365 logo" />
            </div>


           
            <img style={{ width: '5em', height: '5em', borderRadius: '3em' }} src={user} alt="user" />



        </section>
    );
}