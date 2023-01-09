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
    <v-container>
      <CreatorSubtitle
        icon="fas fa-industry"
        text="Partner"
        :definition="definitions['partner']"
      />
      <v-row> <CreatorPartner /> </v-row>

      <CreatorSubtitle
        icon="fas fa-bacteria"
        text="Organism"
      />
      <v-row> <CreatorOrganism /> </v-row>

      <CreatorSubtitle
        text="Expected timeframe"
        icon="fas far fa-calendar-days"
      />
      <v-row> <CreateDates /> </v-row>

      <CreatorSubtitle
        icon="fas fa-table-cells"
        text="Exposure batch"
        :definition="definitions['batch']"
      />
      <v-row> <CreatorBatch /> </v-row>

      <CreatorSubtitle
        text="Experiment conditions"
        icon="fas fa-temperature-quarter"
      />
      <v-row>
        <AddChemicals />
        <SolventDose />
      </v-row>
      <v-row> <CreatorConditions /> </v-row>

      <CreatorSubtitle
        text="Replicates"
        icon="fas fa-copy"
        :definition="definitions['replicates']"
      />
      <v-row> <CreatorReplicates /> </v-row>
    </v-container>
    <CreatorFooter />
  </v-form>
</template>

<script>
import CreatorSubtitle from "./creator-subtitle";
import CreatorFooter from "./creator-footer";
import AddChemicals from "./chemicals/add-chemicals";
import CreateDates from "./dates/create-dates";
import SolventDose from "./solvent-dose";
import CreatorConditions from "./conditions/creator-conditions";
import CreatorPartner from "./creator-partner";
import CreatorBatch from "./creator-batch";
import CreatorReplicates from "./conditions/creator-replicates";
import CreatorOrganism from "./creator-organism";

export default {
  name: "CreateSpreadsheet",
  components: {
    CreatorOrganism,
    CreatorReplicates,
    CreatorBatch,
    CreatorPartner, CreatorConditions, SolventDose, CreateDates, AddChemicals, CreatorFooter, CreatorSubtitle
  },
  data() {
    return {
      valid: true,
      definitions: {
        partner: "The partner is the entity that will be responsible for the data collection. By default, it is " +
                 "the organisation bound to your user account.",
        batch: "A string containing any two capital letters. This will be used to identify the batch in the " +
               "spreadsheet name and to generate the final identifiers.",
        replicates: "The number of empty tubes <span class='red--text font-weight-bold'>(998)</span>, " +
            "exposed replicates <span class='red--text font-weight-bold'>(998)</span> " +
            "and controls <span class='red--text font-weight-bold'>(999/997)</span> to be generated.",
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
