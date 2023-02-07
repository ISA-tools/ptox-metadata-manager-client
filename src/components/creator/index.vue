<template>
  <v-form
    id="create-form"
    ref="createForm"
    v-model="valid"
    lazy-validation
    stye="height: 100%"
  >
    <v-container
      fluid
      class="pa-0 pt-4 primary"
    >
      <v-row no-gutters>
        <v-col
          cols="12"
          class="d-flex white--text align-center justify-center pb-8"
        >
          <h2 class="text-center pageTitle">
            Spreadsheet creator
          </h2>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="pa-0">
      <v-row no-gutters>
        <v-col cols="12">
          <CreatorSubtitle
            icon="fas fa-industry"
            text="Partner"
            :definition="definitions['partner']"
          />
          <CreatorPartner />
        </v-col>
        <v-col cols="12">
          <CreatorSubtitle
            icon="fas fa-bacteria"
            text="Organism"
            :definition="definitions['organism']"
          />
          <CreatorOrganism />
        </v-col>
        <v-col cols="12">
          <CreatorSubtitle
            text="Expected timeframe"
            icon="fas far fa-calendar-days"
            :definition="definitions['timeframe']"
          />
          <CreateDates />
        </v-col>
        <v-col cols="12">
          <CreatorSubtitle
            icon="fas fa-table-cells"
            text="Exposure batch"
            :definition="definitions['batch']"
          />
          <CreatorBatch />
        </v-col>
        <v-col cols="12">
          <CreatorSubtitle
            id="chemicalsSelector"
            text="Chemicals"
            icon="fas fa-virus"
            :definition="definitions['chemicals']"
          />
          <AddChemicals />
        </v-col>
        <v-col cols="12">
          <CreatorSubtitle
            text="Timepoints"
            icon="fas fa-clock"
            :definition="definitions['timepoints']"
          />
          <CreatorConditions />
        </v-col>

        <v-col cols="12">
          <CreatorSubtitle
            text="Dose"
            icon="fas fa-vial"
            :definition="definitions['dose']"
          />
          <CreatorDose />
        </v-col>

        <v-col cols="12">
          <CreatorSubtitle
            text="Solvent"
            icon="fas fa-flask-vial"
            :definition="definitions['solvent']"
          />
          <CreatorSolvent />
        </v-col>

        <v-col cols="12">
          <CreatorSubtitle
            text="Replicates"
            icon="fas fa-copy"
            :definition="definitions['replicates']"
          />
          <CreatorReplicates />
        </v-col>
      </v-row>
    </v-container>
    <CreatorFooter />
  </v-form>
</template>

<script>
import CreatorSubtitle from "./creator-subtitle";
import CreatorFooter from "./creator-footer";
import AddChemicals from "./chemicals/add-chemicals";
import CreateDates from "./dates/create-dates";
import CreatorConditions from "./conditions/creator-conditions";
import CreatorPartner from "./creator-partner";
import CreatorBatch from "./creator-batch";
import CreatorReplicates from "./conditions/creator-replicates";
import CreatorOrganism from "./creator-organism";
import CreatorDose from "./creator-dose.vue";
import CreatorSolvent from "./creator-solvent.vue";

export default {
  name: "CreateSpreadsheet",
  components: {
    CreatorDose,
    CreatorOrganism,
    CreatorReplicates,
    CreatorBatch,
    CreatorPartner,
    CreatorConditions,
    CreatorSolvent,
    CreateDates,
    AddChemicals,
    CreatorFooter,
    CreatorSubtitle
  },
  data() {
    return {
      valid: true,
      definitions: {
        partner: "The partner is the entity that will be responsible for the data collection. By default, it is " +
                 "the organisation bound to your user account.",
        batch: "A string containing any two capital letters. This will be used to identify the batch in the " +
               "spreadsheet name and to generate the final identifiers.",
        replicates: "The number of empty tubes, exposed replicates and controls to be generated.",
        organism: "The organism to be used in the experiment. This will be used to generate the final identifiers.",
        timeframe: "The experiment start and end dates. This is just an indicator and will not " +
                   "be used to generate the final identifiers.",
        dose: "The exposition dose for the choosen chemicals, to select between: " +
            "<ul>" +
            "<li><b class='red--text'>High</b> (10mg/L)</li>" +
            "<li> <b class='primary--text'>Medium</b> (BM25)</li>" +
            "<li> <b class='green--text'>Low</b> (BMD10)</li>" +
            "</ul>",
        solvent: "The solvent to be used in the experiment (water or DMSO). Only one solvent can be selected, so " +
            "make sure all chemicals are soluble in the selected solvent for this batch. This will be used to " +
            "generate the final identifiers.",
        chemicals: "You need to select at least one chemical. The chemicals will be used to generate " +
            "the final identifiers. You can search chemicals using their name or internal identifier.",
        timepoints: "The number of timepoints to be used in the experiment. This will be used to generate the " +
            "final identifiers."
      }
    }
  }
}
</script>

<style>
  .fullWidth {
    width: 100%;
    height: 100%;
  }
</style>
