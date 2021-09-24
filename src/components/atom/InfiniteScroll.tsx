import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDataGetting} from "../../module/PostsWall/usecase/useDataGetting";
import styled from "@emotion/styled";
import {DetailPage} from "./DetailPage";
import Loading from "./Loading";

const Base = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  width: 50%;
  overflow-y: auto;
  height: 100%;
  max-height: 100%;
  flex-wrap: wrap;
  padding-top: 10px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  padding: 10px 10px 20px 10px;
  border-radius: 4px;
  width: 45%;
  height: 40%;
  box-shadow: #2e8484 0px 0px 2px;
  margin-bottom: 10px;

  &:hover {
    background-color: rgba(203, 203, 203, 0.45);
  }
`;

const CardTitle = styled.h2`
  margin: 5px 0 10px 0;
  color: #2e2e2e;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const CardImageBlock = styled.div`
  width: 90%;
  height: 80%;
  display: flex;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 10px;

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

interface BackToTopButtonProps {
    visibility: "flex" | "none";
}

const BackToTopButton = styled.a<BackToTopButtonProps>`
  position: absolute;
  bottom: 20px;
  right: 26.5%;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(56, 99, 158, 0.66);
  display: ${(props) => props.visibility};
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: white;
  font-weight: 900;
  cursor: pointer;

  &:hover {
    background-color: rgb(177, 231, 253);
  }
`;

const NothingMoreBlock = styled.div`
  position: absolute;
  width: 40%;
  height: 30%;
  background-color: rgba(203, 203, 203, 0.34);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  font-size: 2rem;
  top: 40%;
  border-radius: 8px;
`;
const InfiniteScroll = () => {
    const offset = useRef(0);

    const [urlPath, setUrlPath] = useState<string>(
        `${process.env.REACT_APP_API}&offset=${offset.current}`
    );

    const {assets, hasMore, isLoading, error} = useDataGetting(urlPath);
    // const assetsArray = useMemo(() =>
    //         assets.length > 0 && !error
    //             ? assets.map((item: PostContentInterface) => {
    //                 const {id, token_id, asset_contract, image_preview_url, name} = item;
    //                 return {
    //                     id,
    //                     token_id,
    //                     address: asset_contract.address,
    //                     image_preview_url,
    //                     name
    //                 };
    //             })
    //             : [
    //                 // {
    //                 //     id: "0",
    //                 //     token_id: "0",
    //                 //     address: "00000AAAAAAA",
    //                 //     name: "empty",
    //                 //     image_preview_url: undefined,
    //                 // }
    //             ]
    //     , [assets, error]);
    const observer = useRef<null | IntersectionObserver>();
    const lastPostBlock = useCallback(
        (lastNode) => {
            observer.current && observer.current.disconnect();
            observer.current = new IntersectionObserver(
                (entries) => {
                    if(entries[0].isIntersecting && hasMore) {
                        offset.current = (offset.current + 1);
                        setUrlPath(
                            `${process.env.REACT_APP_API}&offset=${offset.current * 20}`
                        );
                    }
                },
                {threshold: 0.8}
            );
            hasMore && lastNode && observer.current?.observe(lastNode);
        },
        [hasMore]
    );

    const [showNoContentBlock, setShowNoContentBlock] =
        useState<boolean>(false);
    useEffect(() => {
        if(!hasMore) {
            setShowNoContentBlock(true);
            setTimeout(() => setShowNoContentBlock(false), 3000);
        }
    }, [hasMore]);


    const [isShowDetailPage, setIsShowDetailPage] = useState(false);
    const contract_address = useRef("");
    const token_id = useRef("");
    const handleCardClick = (address: string, tokenId: string) => {
        console.log("123")
        setIsShowDetailPage(true);
        contract_address.current = address;
        token_id.current = tokenId;
    }

    return (
        <Base>
            {isLoading && <Loading/>}
            {assets.map((item, index: number) =>
                <Card key={`${item.name}_${item.id}_${index}`} ref={assets.length === index + 1 ? lastPostBlock : null}
                      onClick={() => {
                          handleCardClick(item.address, item.token_id)
                      }}>
                    <CardImageBlock>
                        {item.image_preview_url && <img src={item.image_preview_url} alt={item.name}/>}
                    </CardImageBlock>
                    <CardTitle>{item.name}</CardTitle>
                </Card>
            )}
            {showNoContentBlock && (
                <NothingMoreBlock>抱歉，暫時沒有更多內容</NothingMoreBlock>
            )}
            {isShowDetailPage && <DetailPage contract_address={contract_address.current} token_id={token_id.current}
                                             handleDetailPageVisibility={setIsShowDetailPage}/>}
        </Base>
    );
};

export default InfiniteScroll;
