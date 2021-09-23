import React, { Suspense } from "react";
import * as Module from "./module";
import FallbackPage from "./components/atom/FallbackPage";


export const App = () => {
    return (
        <Suspense fallback={<FallbackPage />}>
            <Module.PostsWall />
        </Suspense>
    );
};
