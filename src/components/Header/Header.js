import "./Header.css";

const Header = () => {
    return (
        <div className="Header" >
            <a href="https://wafflestudio.com" target="_blank" rel="noreferrer">
                <img src="https://wafflestudio.com/_next/image?url=%2Fimages%2Ficon_intro.svg&w=256&q=75" alt="waffleLogo" className={"waffleLogo"}/>
            </a>

            <span className="title">와플고등학교 명단 관리 프로그램 </span>

        </div>
    );
}

export default Header;