import db from "../../../../databases"
import { IStats } from "../../../types";

class StatService {
    private model = db.stats;

    private id: string;

    constructor(id = '') {
        this.id = id;
    }

    public async create(params: IStats) {
        const stats = await this.model.create(params).catch(e => { throw e; });
        return stats;
    }

    public async findOne() {
        const stat = await this.model.findById(this.id).catch(e => { throw e; });
        return stat;
    }
}

export default StatService
