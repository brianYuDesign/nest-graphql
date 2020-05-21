import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ItemInput } from './input/item.input';
import { ItemType } from './type/item.type';
import { Item } from './interface/item.interface';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private itemModel: Model<Item>) {}

  async create(createItemDto: ItemInput): Promise<ItemType> {
    const createdItem = new this.itemModel(createItemDto);
    return await createdItem.save();
  }

  async findAll(): Promise<ItemType[]> {
    return await this.itemModel.find().exec();
  }

  async findOne(id: string): Promise<ItemType> {
    return await this.itemModel.findOne({ _id: id });
  }

  async delete(id: string): Promise<ItemType> {
    return await this.itemModel.findByIdAndRemove(id);
  }

  async update(id: string, item: Item): Promise<ItemType> {
    return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
  }
}
