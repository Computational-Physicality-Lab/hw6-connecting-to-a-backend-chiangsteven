import { Link } from "react-router-dom";

const footerNotImpText = ["Contact Us", "Site Map", "Privacy Policy", "Careers", "Reviews"];

function Footer() {
    return (
        <>
            <footer>
                {/* <Link to="/NotImpemented">Contact Us</Link>
        <Link to="/NotImpemented">Site Map</Link>
        <Link to="/NotImpemented">Privacy Policy</Link>
        <Link to="/NotImpemented">Careers</Link>
        <Link to="/NotImpemented">Reviews</Link> */}
                {footerNotImpText.map((text, id) =>
                    (<Link key={id} to="/not_implemented">{text}</Link>))}
                <div>Designed by Chung-Han Chiang</div>
            </footer>
        </>
    );
}

export default Footer;