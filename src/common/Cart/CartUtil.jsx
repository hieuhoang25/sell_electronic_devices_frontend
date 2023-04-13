import { NumericFormat } from 'react-number-format';
import { CURRENCY_SUFFIX } from '../../constants/index';
import { getImage } from '../../common/img';

export const QTY_MAX = 5;
export const QTY_MIN = 1;

export function getVariantDetail(cartItem) {
    const { productVariant } = cartItem;
    return { ...productVariant };
}

export function getProductVariantDetail(cartItem) {
    const { productVariant } = cartItem;
    return productVariant;
}
export function getProductName(cartItem) {
    const variant = getProductVariantDetail(cartItem);
    return variant.product_name;
}

export function getColorOfCartItem(cartItem) {
    return getProductVariantDetail(cartItem).color_name;
}

export function getStorageOfCartItem(cartItem) {
    return getProductVariantDetail(cartItem).storage_name;
}

export function getPromotion(cartItem) {
    return getProductVariantDetail(cartItem).product_promotion == null
        ? false
        : true;
}
export function getPromotionValue(cartItem) {
    const { product_promotion: promotion } = getProductVariantDetail(cartItem);
    const { activate, is_percent, discount_amount } = promotion;
    // console.log(promotion);
    return activate
        ? is_percent
            ? `-${discount_amount}%`
            : `${discount_amount}`
        : '';
}
export function getPriceDetail(cartItem) {
    return cartItem.price_detail;
}
export function getDiscountAmountOfItem(item) {
    console.log('price detail : ', item.price_detail );
    console.log('item.discount_amount : ', item.discount_amount );
    console.log('item.quantity : ', item.quantity );
    return item.price_detail - ( item.discount_amount * item.quantity );
}

export const CartRequestTYPE = {
    UPDATE: Symbol('update'),
    ADD: Symbol('add'),
    DELETE: Symbol('delete'),
    DECR: Symbol('decrement'),
};
export function getCartDetailRequest(action, CartRequestTYPEz) {
    const init = {
        cart_id: action.cart_id,
        product_variant_id: action.product_variant_id,
        quantity: action.quantity,
    };
    const { UPDATE, ADD, DELETE, DECR } = CartRequestTYPE;

    const update = { ...init, id: action.id, quantity: 1 };
    switch (CartRequestTYPEz) {
        case CartRequestTYPE.UPDATE:
            return { ...init, id: action.id };
        case CartRequestTYPE.DELETE:
            return {
                id: action.id,
                cart_id: action.cart_id,
                quantity: action.quantity,
            };
        case CartRequestTYPE.DECR:
            return { ...init, id: action.id };
        default:
            return { ...init };
    }
}

export function getCurrencyFormatComp(
    value,
    haveSuffix = false,
    className = '',
) {
    return haveSuffix ? (
        <NumericFormat
            value={value}
            displayType={'text'}
            thousandSeparator={true}
            suffix={' ' + CURRENCY_SUFFIX}
            className={className}
        />
    ) : (
        <NumericFormat
            value={value}
            displayType={'text'}
            thousandSeparator={true}
            className={className}
        />
    );
}

export default class CartItemUtilClass {
    constructor(item) {
        this.cartItem = item;
        console.log('this.cartItem: ', this.cartItem);
    }

    get priceDetail() {
        return this.cartItem.price_detail;
    }
    get variantPrice() {
        return this.getVariantDetail().price;
    }
    get quantity() {
        return this.cartItem.quantity;
    }
    get ItemImage() {
        return this.getVariantDetail().image;
    }
    // Getter
    get Item() {
        return this.cartItem;
    }
    // Method
    getVariantDetail() {
        return this.cartItem.productVariant;
    }
    get displayName() {
        console.log('call display name');
        return this.getVariantDetail().display_name;
    }
    get productName() {
        const variant = getVariantDetail();
        return variant.product_name;
    }

    get colorOfCartItem() {
        return this.getVariantDetail().color_name;
    }

    get storageOfCartItem() {
        return this.getVariantDetail().storage_name;
    }

    get promotion() {
        return this.getVariantDetail().product_promotion == null ? false : true;
    }
    get promotionValue() {
        const { product_promotion: promotion } = this.getVariantDetail();
        console.log('PROOMM');
        if (promotion == null) {
            return 0;
        } else if (!promotion.activate) {
            return 0;
        } else {
            console.log(promotion);
            const { activate, is_percent, discount_amount } = promotion;
            console.log(promotion);
            return activate
                ? is_percent
                    ? `-${discount_amount}%`
                    : `${discount_amount}`
                : '';
        }
    }
    get priceDiscountForPerItem() {
        return this.variantPrice - this.cartItem.discount_amount;
    }
}
