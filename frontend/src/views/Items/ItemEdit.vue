<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Edit Order</h2>
      </div>

      <div class="mt-10 sm:mt-0">
        <form action="#" method="POST">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label for="price" class="block text-sm font-medium text-gray-700">Order Price</label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    @change="(e) => onChange(e, 'price')"
                    :value="itemToEdit?.price"
                    autocomplete="given-name"
                    class="mt-1 p-2 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="freight_value" class="block text-sm font-medium text-gray-700">Freight Value</label>
                  <input
                    type="number"
                    name="freight_value"
                    id="freight_value"
                    @change="(e) => onChange(e, 'freight_value')"
                    :value="itemToEdit?.freight_value"
                    autocomplete="family-name"
                    class="mt-1 p-2 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            <Message :message="message" :status="status" />

            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                @click.prevent="updateOrder"
                type="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, computed } from "vue"
import { useStore } from "vuex"
import { useRoute } from "vue-router"
import Message from "@/components/Message";

export default {
  name: "ItemEdit",
  components: {
    Message,
  },

  setup() {
    const store = useStore()
    const router = useRoute()

    const state = reactive({
      price: "",
      freight_value: "",
    })

    const itemToEdit = computed(() => store?.state.Items.item)

    const message = computed(() => store?.state.Items.message)
    const status = computed(() => store?.state.Items.status)

    const onChange = (e, stateKey) => {
      state[stateKey] = e.target.value
    }



    const updateOrder = () => {
      store?.dispatch("Items/updateOneItem", {
        price: +state.price || +itemToEdit.value.price,
        freight_value: +state.freight_value || +itemToEdit.value.freight_value,
        id: itemToEdit?.value.order_id,
      })
    }

    onMounted(() => {
      const { id } = router.params
      store?.dispatch("Items/getOneItem", id)
    })

    return {
      state,
      updateOrder,
      itemToEdit,
      onChange,
      message,
      status
    }
  },
}
</script>

<style scoped></style>
