import { Tag } from '../entity/tag.entity';
import * as tagRepository from '../repository/tag.repository';

export async function getAllTags(): Promise<Tag[]> {
    return await tagRepository.getAllTags();
}