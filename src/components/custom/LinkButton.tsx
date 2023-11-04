import { IconButton, Typography } from "@mui/material";
import {
    OpenInNew
} from "@mui/icons-material";
import { Image } from 'mui-image';

interface LinkButtonProps {
    href: string | undefined;
}

const isValidUrl = (urlString: string): boolean => {
    let url;

    try { 
        url =new URL(urlString); 
    }
    catch(e){ 
        return false; 
    }
    
    return url.protocol === "http:" || url.protocol === "https:";
}

const isImage = (urlString: string): boolean => {
    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(urlString);
}

export const LinkButton = ({ href }: LinkButtonProps) => {
    if (href && isValidUrl(href) && isImage(href)) {
        return (
            <Image
                src={href}
                alt="Main photo"
                width={150}
                height={150}
            />
        )
    } else if (href && isValidUrl(href) && !isImage(href)) {
        return(
            <IconButton color="primary" target="_blank" href={href}>
                <OpenInNew />
            </IconButton>
        )
    } else {
        return(
            <Typography>
                No link provided
            </Typography>
        )
    }
};
