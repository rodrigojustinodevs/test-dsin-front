import { useEffect, useState } from "react";

import BreadcrumbsHeader from "../BreadcrumbsHeader";
import Header from "../Header";
import { UnderNavbarHeader } from "../Header/styles";
import VerticalHeader from "../Header/VertialHeader";
import { AdminNavBar } from "../Navbar/AdminNavBar";
import { NavBar } from "../Navbar/AdminStyles";
import PreloadFb from "../Preload";
import { BodyContentStyle } from "./styles";
import {
    BodyContentStyle as BodyContentVerticalStyle,
    PreBody,
    UnderNavbarHeader as UnderNavbarHeaderVertical,
} from "./VerticalStyles";

type Props = {
    children: JSX.Element;
};

function PageWrapper({ children }: Props) {
    // const [horientation, setHorientation] = useState(window.header_orientation);
    const [horientation, setHorientation] = useState("horizontal");
    const [isLoading, setIsLoading] = useState(false);

    // const main = document.getElementById("main-divider");
    // main?.addEventListener("changeNavBar", (event: any) => {
    //     const h = horientation === "horizontal" ? "vertical" : "horizontal";
    //     window.header_orientation = h;
    //     setHorientation(h);
    //     localStorage.setItem("navBarOrientation", h);
    // });

    // useEffect(() => {
    //     const h = localStorage.getItem("navBarOrientation");
    //     window.header_orientation = h ?? "horizontal";
    //     setHorientation(horientation ?? h ?? "horizontal");
    // });

    // useEffect(() => {
    //     window.addEventListener("resize", function handle(e) {
    //         if (window.innerWidth < 950) {
    //             setHorientation("horizontal");
    //         } else {
    //             setHorientation("vertical");
    //         }
    //     });
    // });

    return (
        <div id="main-divider">
            {horientation === "vertical" && isLoading ? (
                <PreloadFb />
            ) : (
                <div>
                    {horientation === "vertical" ? (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            <VerticalHeader />
                            <AdminNavBar />
                            <PreBody>
                                <UnderNavbarHeaderVertical className="no-print">
                                    <BreadcrumbsHeader />
                                </UnderNavbarHeaderVertical>
                                <BodyContentVerticalStyle>
                                    {children}
                                </BodyContentVerticalStyle>
                            </PreBody>
                        </div>
                    ) : (
                        <div>
                            <Header />
                            <BodyContentStyle>{children}</BodyContentStyle>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default PageWrapper;
