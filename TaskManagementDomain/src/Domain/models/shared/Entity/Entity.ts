import { DomainEventStorable } from 'Domain/shared/DomainEvent/DomainEvent';
import { CreatedAt } from '../CreatedAt/CreatedAt';
import { UpdatedAt } from '../UpdatedAt/UpdatedAt';
import { DomainException } from 'Domain/shared/DomainException';

export abstract class Entity extends DomainEventStorable {
  constructor(
    private readonly _createdAt: CreatedAt,
    private _updatedAt: UpdatedAt
  ) {
    super();
  }

  protected changeUpdatedAt(updatedAt: UpdatedAt): void {
    if (this._createdAt.value > updatedAt.value) {
      throw new DomainException('更新日は作成日よりも後でなければいけません');
    }
    this._updatedAt = updatedAt;
  }

  get createdAt(): CreatedAt {
    return this._createdAt;
  }

  get updatedAt(): UpdatedAt {
    return this._updatedAt;
  }
}
