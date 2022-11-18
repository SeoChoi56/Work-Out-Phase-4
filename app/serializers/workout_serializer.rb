class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :category, :name, :equipment, :review, :muscle, :difficulty
end
