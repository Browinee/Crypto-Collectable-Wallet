import React from "react";
import styled from "@emotion/styled";
import InfiniteScroll from "./InfiniteScroll";

const Base = styled.div`
    position: relative;
    background-color: #11334bff;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;


const PostsWall = () => {
    return (
        <Base>
            <InfiniteScroll />
        </Base>
    );
};

export default PostsWall;
