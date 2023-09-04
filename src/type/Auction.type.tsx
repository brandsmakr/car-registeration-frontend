export interface AuctionCardProps {
  id?: string;
  imgSrc: string;
  title: string;
  descBtnType?: string | null;
  description: string;
  address?: string;
  time?: string | number;
  amount: string | number | null;
}

export interface ListingCardProps {
  id?: string;
  imgSrc: any;
  title: string;
  descBtnType?: string | null;
  description: string;
  detailList: string[];
  address: string;
  listType: string;
}

export interface OldSaleCardProps {
  imgSrc: string;
  title: string;
  cardStatus: string;
  amount: string | number;
}

// containerStyles?: string;
// handleClick?: MouseEventHandler<HTMLButtonElement>;
// btnType?: "button" | "submit";
