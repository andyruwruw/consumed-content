<template>
  <div>
    <div
      v-for="(person, index) in people"
      :key="`person-${id}-${index}`"
      :class="$style.person">
      <img :src="person.image" />

      <span>
        {{ person.name }}
      </span>

      <v-btn dark icon>
        <v-icon>
          +
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

const NAMES = [
  'Michael',
  'Christopher',
  'Jessica',
  'Matthew',
  'Ashley',
  'Jennifer',
  'Joshua',
  'Amanda',
  'Daniel',
  'David',
  'James',
  'Robert',
  'John',
  'Joseph',
  'Andrew',
  'Ryan',
  'Brandon',
  'Jason',
  'Justin',
  'Sarah',
  'William',
  'Jonathan',
  'Stephanie',
  'Brian',
  'Nicole',
  'Nicholas',
  'Anthony',
  'Heather',
  'Eric',
  'Elizabeth',
  'Adam',
  'Megan',
  'Melissa',
  'Kevin',
  'Steven',
  'Thomas',
  'Timothy',
  'Christina',
  'Kyle',
  'Rachel',
  'Laura',
  'Lauren',
  'Amber',
  'Brittany',
  'Danielle',
  'Richard',
  'Kimberly',
  'Jeffrey',
  'Amy',
  'Crystal',
  'Michelle',
  'Tiffany',
  'Jeremy',
  'Benjamin',
  'Mark',
  'Emily',
  'Aaron',
  'Charles',
  'Rebecca',
  'Jacob',
  'Stephen',
  'Patrick',
  'Sean',
  'Erin',
  'Zachary',
  'Jamie',
  'Kelly',
  'Samantha',
  'Nathan',
  'Sara',
  'Dustin',
  'Paul',
  'Angela',
  'Tyler',
  'Scott',
  'Katherine',
  'Andrea',
  'Gregory',
  'Erica',
  'Mary',
  'Travis',
  'Lisa',
  'Kenneth',
  'Bryan',
  'Lindsey',
  'Kristen',
  'Jose',
  'Alexander',
  'Jesse',
  'Katie',
  'Lindsay',
  'Shannon',
  'Vanessa',
  'Courtney',
  'Christine',
  'Alicia',
  'Cody',
  'Allison',
  'Bradley',
  'Samuel',
  'Shawn',
  'April',
  'Derek',
  'Kathryn',
  'Kristin',
  'Chad',
  'Jenna',
  'Tara',
  'Maria',
  'Krystal',
  'Jared',
  'Anna',
  'Edward',
  'Julie',
  'Peter',
  'Holly',
  'Marcus',
  'Kristina',
  'Natalie',
  'Jordan',
  'Victoria',
  'Jacqueline',
  'Corey',
  'Keith',
  'Monica',
  'Juan',
  'Donald',
  'Cassandra',
  'Meghan',
  'Joel',
  'Shane',
  'Phillip',
  'Patricia',
  'Brett',
  'Ronald',
  'Catherine',
  'George',
  'Antonio',
  'Cynthia',
  'Stacy',
  'Kathleen',
  'Raymond',
  'Carlos',
  'Brandi',
  'Douglas',
];

const IMAGES = [
  'https://media.istockphoto.com/photos/millennial-male-team-leader-organize-virtual-workshop-with-employees-picture-id1300972574?b=1&k=20&m=1300972574&s=170667a&w=0&h=2nBGC7tr0kWIU8zRQ3dMg-C5JLo9H2sNUuDjQ5mlYfo=',
  'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'data:image/jpeg;base64,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',
  'https://i.pinimg.com/originals/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg',
  'https://bestprofilepictures.com/wp-content/uploads/2021/04/Cool-Profile-Picture-986x1024.jpg',
  'https://i.pinimg.com/550x/1c/c5/35/1cc535901e32f18db87fa5e340a18aff.jpg',
  'https://wallpaperaccess.com/full/2213424.jpg',
  'https://www.itl.cat/pngfile/big/43-430987_cute-profile-images-pic-for-whatsapp-for-boys.jpg',
  'https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png',
];

export default Vue.extend({
  name: 'People',

  props: {
    id: {
      type: String,
    },
  },

  computed: {
    people() {
      const count = Math.ceil(Math.random() * 5);
      const people = [];

      for (let i = 0; i < count; i += 1) {
        const nameIndex = Math.floor(Math.random() * NAMES.length);
        const imageIndex = Math.floor(Math.random() * IMAGES.length);

        people.push({
          name: NAMES[nameIndex],
          image: IMAGES[imageIndex],
        });
      }

      return people;
    },
  },
});
</script>

<style lang="scss" module>
.person {
  display: flex;
  justify-content: left;
  align-items: center;
  margin: 1rem 0;

  img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
  }

  span {
    margin-left: 1rem;
    color: white;
    font-size: 1.2rem;
  }
}
</style>
