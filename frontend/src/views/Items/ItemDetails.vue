<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <Modal :is-modal="state.isModal" :cancel-function="deactivateDeleteModal" :proceed-button="deleteItem" />
    <Message :status="status" :message="message"/>
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">Order Details</h3>
    </div>
    <div class="border-t border-gray-200">
      <dl>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Data ID</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ item?._id }}</dd>
        </div>

        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Order ID</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ item?.order_id }}</dd>
        </div>

        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Order Item ID</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ item?.order_item_id }}</dd>
        </div>

        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Product ID</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ item?.product_id }}</dd>
        </div>

        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Seller ID</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ item?.seller_id }}</dd>
        </div>

        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Shipping ID</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ item?.shipping_limit_date }}</dd>
        </div>

        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Price</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ item?.price }}</dd>
        </div>

        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Freight Value</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ item?.freight_value }}</dd>
        </div>
      </dl>

      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          @click.prevent="editOrder(item?.order_id)"
          type="button"
          class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Edit
        </button>

        <button
          @click.prevent="activateDeleteModal"
          type="button"
          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, reactive } from "vue"
import { useStore } from "vuex"
import { useRoute, useRouter } from "vue-router"
import Modal from "@/components/Modal"
import Message from "@/components/Message"

export default {
  name: "ItemDetails",
  components: {
    Modal,Message
  },

  setup() {
    const state = reactive({
      isModal: false,
    })

    const activateDeleteModal = () => {
      state.isModal = true
    }

    const deactivateDeleteModal = () => {
      state.isModal = false
    }

    const deleteItem = () => {
      const { id } = route.params
      store.dispatch("Items/deleteOneItem", id)
      deactivateDeleteModal()
      setTimeout(()=>Router.push({ name: "Items" }), 3000)
    }

    const store = useStore()
    const route = useRoute()
    const Router = useRouter()

    const item = computed(() => store?.state.Items.item)
    const message = computed(() => store?.state.Items.message)
    const status = computed(() => store?.state.Items.status)

    const editOrder = (id) => {
      Router.push({
        name: "EditItem",
        params: {
          id,
        },
      })
    }

    onMounted(() => {
      const { id } = route.params
      store?.dispatch("Items/getOneItem", id)
    })

    return {
      item,
      state,
      status,
      message,
      editOrder,
      deleteItem,
      activateDeleteModal,
      deactivateDeleteModal,
    }
  },
}
</script>

<style scoped></style>
