import { DependencyContainer, Lifecycle } from "tsyringe";

import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { BaseClasses } from "@spt-aki/models/enums/BaseClasses";
import { DD } from "./DD";

class Mod implements IPreAkiLoadMod, IPostDBLoadMod
{

    public preAkiLoad(container: DependencyContainer): void
    {
        container.register<DD>("DD", DD, {lifecycle: Lifecycle.Singleton});
    }

    public postDBLoad(container: DependencyContainer): void 
    {
        const itemHelper: ItemHelper = container.resolve<ItemHelper>("ItemHelper");
        const tables: IDatabaseTables = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const itemTemplates = Object.values(tables.templates.items);

        const items = itemTemplates.filter(x => itemHelper.isOfBaseclass(x._id, BaseClasses.ITEM));
        container.resolve<DD>("DD").examineAllItems(items);
    }

}

module.exports = { mod: new Mod() }