<template>
  <div class="center" >
    <BarcodeScanner class="barcode-scanner center-heading" :source="camera" @bcs-scanned="scanned" />

    <h2 class="color comfortaa center-heading">BarCodes</h2>
<!--    <ul>-->
<!--      <li v-for="(b, i) in barcodes" :key="i">{{ b.rawValue }} ({{ b.format }})</li>-->
<!--    </ul>-->
    <vs-row justify="space-around">
      <vs-col :w="w" ></vs-col><vs-col :w="w" ></vs-col>
      <vs-col :w="w">
        <vs-button success flat class="comfortaa btn_center" size="small" @click="switchCamera">Switch Camera</vs-button>
      </vs-col>
    </vs-row>
  </div>
</template>
<script type="module">
import { BarcodeDetectorPolyfill } from "@undecaf/barcode-detector-polyfill";
import BarcodeScanner from "@undecaf/vue-barcode-scanner";
try {
    window['BarcodeDetector'].getSupportedFormats()
} catch {
    window['BarcodeDetector'] = BarcodeDetectorPolyfill
}
export default {
  components: {
    BarcodeScanner
  },
  data() {
    return {
      camera: null,
      barcodes: [],
      facingMode:'user',
      w: 12,
      windowWidth: 721
    };
  },
  mounted() {
    this.windowWidth = window.innerWidth;
    if(this.windowWidth>990){
      this.w=4;
    }
    this.startCamera();
  },
  methods: {
    startCamera() {
      // Get the user media stream based on the selected facing mode
      navigator.mediaDevices
          .getUserMedia({
            audio: false,
            video: { facingMode: this.facingMode },
          })
          .then((stream) => (this.camera = stream))
          .catch((err) => console.log(err));
    },
    switchCamera() {
      // Toggle the facing mode between "user" (front camera) and "environment" (rear camera)
      this.facingMode = this.facingMode === "environment" ? "user" : "environment";

      // Stop the current camera stream
      this.camera.getTracks().forEach((track) => track.stop());

      // Start the new camera stream based on the updated facing mode
      this.startCamera();
    },
    scanned(barcodes) {
      if (barcodes.length) {
        // Check if each new barcode already exists in the barcodes array
        for (let i = 0; i < barcodes.length; i++) {
          const barcode = barcodes[i];
          const existingBarcode = this.barcodes.find(
              (b) => b.rawValue === barcode.rawValue && b.format === barcode.format
          );
          if (!existingBarcode) {
            // Concatenate only if barcode is new
            this.barcodes = this.barcodes.concat(barcode);
            this.$emit("new-barcode", barcode);
          }
        }
      }
    }
  },
};
</script>
<style scoped>

</style>
