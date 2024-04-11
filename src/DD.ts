import { inject, injectable } from "tsyringe";
import { LoggingUtil } from "./util/LoggingUtil";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";

@injectable()
export class DD
{

    constructor(
        @inject("LoggingUtil") private loggingUtil: LoggingUtil
    ) 
    {
    }

    public examineAllItems(items: ITemplateItem[]): void
    {
        //examine stuff for me
        for (const item of items)
        {
            item._props.ExaminedByDefault = true;
        }
    }

}