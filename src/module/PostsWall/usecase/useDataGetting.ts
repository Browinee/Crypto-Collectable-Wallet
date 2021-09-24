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
        fetch(urlPath)
            .then((response) => response.json())
            .then((data) => {
                const transformedData = assetAdapter(data.assets);
                setAssets(prev => {
                    return [...prev, ...transformedData];
                });
                setHasMore(data.assets.length > 0);
            })
            .catch((err) => {
                console.info(`%c${err}`, "color: red");
                setError(true);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [urlPath]);

    return {assets, hasMore, error, isLoading};
};
