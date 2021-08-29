<template>
  <div class="flex w-full item-center justify-center">
    <div class="w-2/4 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Your Items</h2>
        </div>

        <ul v-bind:key="item._id" v-for="item in items">
          <li class="list-disc flex justify-between items-center">
            <ul class="flex flex-1 items center justify-between">
              <li>ID: {{ item.order_id }}</li>
              <li class="space-x-1">-</li>
              <li>Price: {{ item?.price }}</li>
              <li></li>
            </ul>

            <a class="block bg-green-500 px-4 py-2 text-white rounded cursor-pointer" @click.prevent="viewItem(item.order_id)">
              View Item
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="w-12/12 flex items-center justify-center">
    <div class="w-2/12 flex items-center justify-evenly">
      <!--      <router-link class="block bg-green-500 px-4 py-2 text-white rounded" v-if="pagination?.prev"-->
      <!--                   :to="{path:'/items',query:{id: pagination?.prev}}">-->
      <!--        Prev111-->
      <!--      </router-link>-->

      <!--      <router-link class="block bg-green-500 px-4 py-2 text-white rounded" v-if="pagination?.next"-->
      <!--                   :to="{path:'/items',query:{id: pagination?.next}}">-->
      <!--        nextttttt-->
      <!--      </router-link>-->

      <button class="block bg-green-500 px-4 py-2 text-white rounded" v-if="pagination?.prev" @click.prevent="prevPage">
        Prev
      </button>

      <button class="block bg-green-500 px-4 py-2 text-white rounded" v-if="pagination?.next" @click.prevent="nextPage">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue"
import { useStore } from "vuex"
import { useRoute, useRouter } from "vue-router"

export default {
  name: "Items",

  setup() {
    const store = useStore()
    const Router = useRouter()
    const router = useRoute()

    let items = computed(() => store?.state?.Items.items)
    let pagination = computed(() => store?.state?.Items.pagination)

    const nextPage = () => {
      Router.replace({
        name: "Items",
        query: { page: pagination.value?.next },
        // path: `/items?page${pagination.value?.next}`
      })

      // const query = `?page=${pagination.value?.next}`
      const query = `?page=${pagination.value?.next}`
      store.dispatch("Items/getAllItems", query)
    }

    const prevPage = () => {
      Router.replace({
        name: "Items",
        query: { page: pagination.value?.prev },
        // path: `/items?page${pagination.value?.prev}`
      })

      // const query = `?page=${pagination.value?.prev}`
      const query = `?page=${pagination.value?.prev}`
      store.dispatch("Items/getAllItems", query)
    }

    const viewItem = (id) => {
      Router.push({
        name: "ItemDetails",
        params: {
          id,
        },
      })
    }

    onMounted(() => {
      const query = router.query.page ? `?page=${router.query.page}` : ""
      store.dispatch("Items/getAllItems", query)
    })

    return {
      items,
      viewItem,
      pagination,
      nextPage,
      prevPage,
    }
  },
}
</script>

<style scoped></style>
