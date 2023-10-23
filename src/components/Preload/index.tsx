import { useState, useEffect } from "react";

import {
    Content,
    Section1,
    Section2,
    Squad1,
    Squad2,
    Squad3,
    Squad4,
} from "./styles";

function PreloadFb() {
    const [change, setChange] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            if (change === 4) {
                return setChange(0);
            }
            return setChange(change + 1);
        }, 300);
    }, [change]);

    return (
        <Content>
            <Section1>
                <Squad1 change={change} />
                <Squad2 change={change} />
            </Section1>
            <Section2>
                <Squad3 change={change} />
                <Squad4 change={change} />
            </Section2>
        </Content>
    );
}

export default PreloadFb;
