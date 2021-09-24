import React, {useCallback} from "react";
import {useDetailGetting} from "../../hooks/useDetailGetting";
import styled from "@emotion/styled";
import Loading from "./Loading";

const StyledDetailPage = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(134, 134, 134, 0.38);
  top: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 30px;
`
const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  width: 50%;
  height: 90%;
  background-color: white;
  row-gap: 10px;
  position: relative;
`;

const CollectionNameBlock = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10%;
  width: 90%;
`

const ImgBlock = styled.div`
  width: 90%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    height: 100%;
  }
`;

const NameBlock = styled.h3`
  width: 90%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DescriptionBlock = styled.div`
  width: 90%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
`;

const PermaLinkButtonBlock = styled.div`
  width: 90%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PermaLinkButton = styled.button`
  width: 40%;
  height: 90%;
  box-shadow: 0 0 0;
  background-color: aqua;
  cursor: pointer;
  font-size: 14px;
`
const CloseButton = styled.div`
  position: absolute;
  right: 16px;
  top: 16px;
  opacity: 0.3;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;
export const DetailPage = (props: { contract_address: string, token_id: string, handleDetailPageVisibility: Function }) => {
    const {handleDetailPageVisibility, contract_address, token_id} = props;
    const {
        collectionName,
        name,
        description,
        imgUrl,
        permalink,
        isLoading,
    } = useDetailGetting(contract_address, token_id);
    const handleClose = useCallback(() => {
        handleDetailPageVisibility(false)
    }, [handleDetailPageVisibility]);
    console.log(isLoading)
    return (
        <>
            {isLoading &&  <Loading/>}
            <StyledDetailPage>
                <Card>
                    <CollectionNameBlock>
                        {collectionName}
                    </CollectionNameBlock>
                    <ImgBlock>
                        <img src={imgUrl} alt={name}/>
                    </ImgBlock>
                    <NameBlock>
                        {name}
                    </NameBlock>
                    <DescriptionBlock>
                        {description}
                    </DescriptionBlock>
                    <PermaLinkButtonBlock>
                        <PermaLinkButton onClick={() => {
                            window.open(permalink)
                        }}>
                            permalink
                        </PermaLinkButton>
                    </PermaLinkButtonBlock>
                    <CloseButton onClick={handleClose}>
                        X
                    </CloseButton>
                </Card>
            </StyledDetailPage>

        </>
    )
}