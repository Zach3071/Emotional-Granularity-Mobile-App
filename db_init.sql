-- Boilerplate code provided by the Master's students to create a user, this should exist already upon the app's launch
create table if not exists user(name string, age int, dark bool default false, font_size int default 12, favorite_color string default '#FF00FF', sex string);
-- Boilerplate code used to create a game, unsure if this exists or if we need to create this when the game first starts
create table if not exists game9(max_level_beaten int default 0, max_level int default 3);
create table if not exists game9_hearts(hearts int, timestamp string default current_timestamp);
create table if not exists game9_vocab(word string primary key, quality float default 1.0, timestamp string default current_timestamp);

-- Custom game database design