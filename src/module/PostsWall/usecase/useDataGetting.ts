import {useEffect, useState} from "react";
import assetAdapter, {Asset} from "../adapter/assetAdapter";

export interface PostContentInterface {
    token_id: string;
    id: number;
    asset_contract: { address: string };
    image_preview_url?: string;
    name: string;
}

interface usePostsGettingReturnInterface {
    assets: Asset[];
    hasMore: boolean;
    error: boolean;
    isLoading: boolean;
}

export const useDataGetting = (
    urlPath: string
): usePostsGettingReturnInterface => {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(urlPath, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            mode: "cors",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {
                if(data) {
                    const transformedData = assetAdapter(data.assets);
                    setAssets(prev => {
                        return [...prev, ...transformedData];
                    });
                }

                setIsLoading(false);
                setHasMore(data.assets.length > 0);
            })
            .catch((err) => {
                console.info(`%c${err}`, "color: red");
                setError(true);
                setIsLoading(false);
            });
    }, [urlPath]);

    return {assets, hasMore, error, isLoading};
};
