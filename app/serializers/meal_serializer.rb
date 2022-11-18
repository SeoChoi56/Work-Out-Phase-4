class MealSerializer < ActiveModel::Serializer
  attributes :id, :name, :calories, :review
end
