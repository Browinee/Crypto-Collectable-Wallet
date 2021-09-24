import { useEffect, useState } from "react";

interface DetailDataInterface {
    collection: {name: string};
    name: string;
    image_original_url: string;
    description: string;
    permalink: string
}

interface UseDetailGettingResponse {
    collectionName: string;
    name: string;
    imgUrl: string;
    description: string;
    permalink: string;
    isLoading: boolean;
}

export const useDetailGetting = (contract_address: string, token_id: string): UseDetailGettingResponse => {
    const [detailData, setDetailData] = useState<DetailDataInterface>({collection: {name: ""}, name: "", image_original_url: "", description: "", permalink: ""});
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const urlPath = `https://api.opensea.io/api/v1/asset/${contract_address}/${token_id}`;
        setIsLoading(true);
        fetch(
            urlPath, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                mode: "cors",
                credentials: "include",
            }
        )
            .then(response => response.json())
            .then(data => {
                setDetailData(data);
            })
            .catch((err) => {
                console.info(`%c${err}`, "color: red");
            })
            .finally(() => {
                setIsLoading(false);
            })

    }, [contract_address, token_id])
    return {isLoading, collectionName: detailData.collection.name, name: detailData.name, imgUrl: detailData.image_original_url, description: detailData.description, permalink: detailData.permalink }
}