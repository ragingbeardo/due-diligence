import { ILogger } from "@spt-aki/models/spt/utils/ILogger";

import { inject, injectable } from "tsyringe";

@injectable()
export class LoggingUtil
{

    constructor(
        @inject("WinstonLogger") private logger: ILogger) 
    {
    }

    public error(message: string) : void
    {
        this.logger.error(`DueDiligence: ${message}`);
    }

}