import home from '../assets/images/banner.png';

function Home() {
    return (
        <>
            <img className="home-pic" src={home} alt="home.png" />
            <div className="textbox-container">
                <div className="textbox">
                    <h3>text1</h3> <br />memeingless block: Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                    galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also
                    the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                    release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
                <div className="textbox">
                    <h3>text2</h3> <br />EEAAO is awesome! Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                    galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also
                    the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                    release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
            </div>
        </>
    );
}

export default Home;