import {PostContentInterface} from "../usecase/useDataGetting";


export interface Asset extends Omit<PostContentInterface, "asset_contract"> {
    address: string;
}

const assetAdapter = (assets: PostContentInterface[]): Asset[] => {
        return assets.map((item: PostContentInterface) => {
            const {id, token_id, asset_contract, image_preview_url, name} = item;
            return {
                id,
                token_id,
                address: asset_contract.address,
                image_preview_url,
                name
            };
        })
    }

;
export default assetAdapter;