import React, { CSSProperties } from 'react';

const backgroundImage: CSSProperties = {
    backgroundImage: "URL('https://images.unsplash.com/photo-1473081556163-2a17de81fc97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1834&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center"
}

const logo: CSSProperties = {
    backgroundImage: "url('/static/media/budgeteer-white.c6123160.png')",
    backgroundSize: "cover",
    backgroundPosition: "center"
}

const LandingPage = ({props}: any) => {
    return (
        <div className="h-screen p-6 l:p-0 flex flex-col justify-center items-center" style={backgroundImage}>
            <div className="h-64 w-64" style={logo}></div>
            <div className="text-white">Save that money.</div>
            <div className="h-64 w-64">

            </div>
        </div>
    )
}

export default LandingPage;