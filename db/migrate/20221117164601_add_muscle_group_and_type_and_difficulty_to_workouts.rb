class AddMuscleGroupAndTypeAndDifficultyToWorkouts < ActiveRecord::Migration[6.1]
  def change
    add_column :workouts, :muscle, :string
    add_column :workouts, :category, :string
    add_column :workouts, :difficulty, :string
  end
end
